
import type { formField } from "../../types/formField";

// hooks 
import { useAddress } from "./store/addressStore";
import { useNavigate } from "react-router-dom";

// Component 
import { FormUI } from "../../shared/ui/Form";
import { SectionTitle } from "../../shared/components/SectionTitle";


const formOptions: formField[] = [
    {
        name: "full_name",
        label: "Full Name",
        type: "text",
        placeHolder: "Enter your full name",
        note: "Used for delivery and contact",
        required: true,
    },
    {
        name: "phone",
        label: "Phone Number",
        type: "text",
        placeHolder: "Enter your phone number",
        note: "Courier may call you",
        required: true,
    },
    {
        name: "address_line_1",
        label: "Address Line 1",
        type: "textarea",
        placeHolder: "House no, street name, area",
        required: true,
    },
    {
        name: "address_line_2",
        label: "Address Line 2",
        type: "text",
        placeHolder: "Apartment, landmark (optional)",
        note: "Helps delivery partner find you faster",
    },
    {
        name: "city",
        label: "City",
        type: "text",
        placeHolder: "Enter your city",
        required: true,
    },
    {
        name: "state",
        label: "State",
        type: "text",
        placeHolder: "Enter your state",
        required: true,
    },
    {
        name: "pincode",
        label: "Pincode",
        type: "text", // keep text to preserve leading 0
        placeHolder: "Enter your pincode",
        required: true,
    },
];


const AddressPage = () => {
    console.log("Address page render");
    const navigate = useNavigate();
    const { addresses, setAddress } = useAddress();
    const savedAddress = addresses?.length > 0 ? addresses[addresses.length - 1] : undefined;





    const handleAddressSubmitForm = (data: any) => {
        console.log("form data => ", data)
        if (data && Object.keys(data).length > 0) {
            setAddress(data);
            navigate("/payment");
        }
    }

    return (
        <div
            style={{
                display: "grid",
                placeItems: "center",
                padding: "10px",
            }}
        >

            <SectionTitle>Address</SectionTitle>

            <div style={{ height: "10px" }} />

            <FormUI
                buttonTitle="Save and Continue"
                fields={formOptions}
                initialValues={savedAddress}
                onSubmit={(formData) => handleAddressSubmitForm(formData)}
            />
        </div>
    )
}


export default AddressPage;