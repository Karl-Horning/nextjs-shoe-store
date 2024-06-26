"use client";

import { useState } from "react";
import { Button, Divider, Select, SelectItem } from "@nextui-org/react";
import { IoReceiptOutline } from "react-icons/io5";
import { useMutation, gql } from "@apollo/client";
import { useBag } from "@/contexts/BagContext";
import { countries } from "@/data/countries";
import { Input } from "@nextui-org/input";
import { v4 as uuidv4 } from "uuid";

/**
 * Mutation to send order data.
 */
const CREATE_ORDER = gql`
    mutation createOrder($input: CreateOrderInput!) {
        createOrder(input: $input) {
            OrderId
            FullName
            PhoneNumber
            EmailAddress
            StreetAddress
            AddressLine2
            CityTown
            StateProvinceRegion
            PostCode
            Country
            ShoeId
            Size
        }
    }
`;

/**
 * ShippingForm functional component.
 *
 * @returns {JSX.Element} Shipping form JSX.
 */
export default function ShippingForm() {
    const { bag, clearBag } = useBag();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        orderId: uuidv4(),
        fullName: "",
        email: "",
        phone: "",
        streetAddress: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
    });

    const [createOrder] = useMutation(CREATE_ORDER);

    /**
     * Handles input change event.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
     */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    /**
     * Handles select change event.
     *
     * @param {React.ChangeEvent<HTMLSelectElement>} e - The change event.
     */
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setFormData((prevData) => ({ ...prevData, country: value }));
    };

    /**
     * Handles form submission event.
     *
     * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
     */
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const shoeIds = bag.map((item) => item.ShoeId);
        const sizes = bag.map((item) => item.Size);

        const orderData = {
            OrderId: formData.orderId,
            FullName: formData.fullName,
            EmailAddress: formData.email,
            PhoneNumber: formData.phone,
            StreetAddress: formData.streetAddress,
            AddressLine2: formData.addressLine2,
            CityTown: formData.city,
            StateProvinceRegion: formData.state,
            PostCode: formData.postalCode,
            Country: formData.country,
            ShoeId: shoeIds,
            Size: sizes,
        };

        try {
            await createOrder({
                variables: {
                    input: orderData,
                },
            });
            setIsSubmitted(true);
            clearBag();
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    return (
        <main className="container mx-auto">
            <h1 className="mb-5 text-2xl">Shipping Info</h1>

            <Divider className="mb-5" />

            {isSubmitted ? (
                <div className="text-center">
                    <h2 className="mb-5 text-xl font-bold">
                        Order Placed Successfully!
                    </h2>
                    <p>
                        Thank you for your order. Your items will be shipped
                        soon.
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2 className="mb-5 text-lg">Contact</h2>

                    <div className="gap-4 lg:grid lg:grid-cols-2">
                        <Input
                            className="mb-5"
                            isRequired
                            label="Full Name"
                            name="fullName"
                            onChange={handleInputChange}
                            required
                            type="text"
                        />
                        <Input
                            className="mb-5"
                            label="Email Address (optional)"
                            name="email"
                            onChange={handleInputChange}
                            type="email"
                        />
                    </div>
                    <Input
                        className="mb-5"
                        isRequired
                        label="Phone Number"
                        name="phone"
                        onChange={handleInputChange}
                        required
                        type="tel"
                    />

                    <h2 className="mb-5 text-lg">Address</h2>
                    <Input
                        className="mb-5"
                        isRequired
                        label="Street Address"
                        name="streetAddress"
                        onChange={handleInputChange}
                        required
                        type="text"
                    />
                    <Input
                        className="mb-5"
                        label="Address Line 2 (optional)"
                        name="addressLine2"
                        onChange={handleInputChange}
                        type="text"
                    />

                    <div className="gap-4 lg:grid lg:grid-cols-2">
                        <Input
                            className="mb-5"
                            isRequired
                            label="City/Town"
                            name="city"
                            onChange={handleInputChange}
                            required
                            type="text"
                        />
                        <Input
                            className="mb-5"
                            label="State/Province/Region (optional)"
                            name="state"
                            onChange={handleInputChange}
                            type="text"
                        />
                    </div>
                    <Input
                        className="mb-5"
                        isRequired
                        label="Postal Code"
                        name="postalCode"
                        onChange={handleInputChange}
                        required
                        type="text"
                    />
                    <Select
                        isRequired
                        label="Country"
                        onChange={handleSelectChange}
                        className="mb-5"
                    >
                        {countries.map((country) => (
                            <SelectItem key={country.key} value={country.label}>
                                {country.label}
                            </SelectItem>
                        ))}
                    </Select>

                    <Button
                        className="my-5 w-full"
                        color="secondary"
                        endContent={<IoReceiptOutline />}
                        radius="lg"
                        size="lg"
                        type="submit"
                    >
                        Place order
                    </Button>
                </form>
            )}
        </main>
    );
}
