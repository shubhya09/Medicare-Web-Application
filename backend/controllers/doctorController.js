import doctorModel from "../models/doctorModel.js";

// Change Availability Function
const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;

        // Validate input
        if (!docId) {
            return res.status(400).json({ success: false, message: "Doctor ID is required." });
        }

        // Find doctor and toggle availability
        const docData = await doctorModel.findById(docId);
        if (!docData) {
            return res.status(404).json({ success: false, message: "Doctor not found." });
        }

        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available }, { new: true });
        res.json({ success: true, message: "Availability Changed" });
    } catch (error) {
        console.error("Error in changeAvailability:", error.message);
        res.status(500).json({ success: false, message: "Server error. Try again later." });
    }
};

// Doctor List Function
const doctorList = async (req, res) => {
    try {
        const tdoctors = await doctorModel.find({}).select(["-password", "-email"]); // Exclude sensitive fields
        res.json({ success: true, tdoctors });
    } catch (error) {
        console.error("Error in doctorList:", error.message);
        res.status(500).json({ success: false, message: "Server error. Try again later." });
    }
};

export { changeAvailability, doctorList };
