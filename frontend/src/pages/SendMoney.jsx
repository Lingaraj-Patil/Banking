import axios from "axios";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [status, setStatus] = useState(null); // 'success', 'error', or null
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleTransfer = async () => {
        if (!amount || amount <= 0) {
            setStatus("error");
            setMessage("Please enter a valid amount");
            return;
        }

        setIsLoading(true);
        setStatus(null);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/v1/account/transfer",
                {
                    to: id,
                    amount: Number(amount) // Convert to number
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            );

            setStatus("success");
            setMessage("Transfer successful!");
            setIsLoading(false);
            
            // Clear amount field after successful transfer
            setAmount(0);
            
            // Optionally, redirect to dashboard after a delay
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
            
        } catch (error) {
            setIsLoading(false);
            setStatus("error");
            setMessage(
                error.response?.data?.message || 
                "An error occurred during the transfer. Please try again."
            );
        }
    };

    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">
                                    {name && name.length > 0 ? name[0].toUpperCase() : '?'}
                                </span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="amount"
                                >
                                    Amount (in Rs)
                                </label>
                                <input
                                    onChange={(e) => setAmount(e.target.value)}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                    value={amount}
                                    disabled={isLoading}
                                />
                            </div>
                            
                            {status === "success" && (
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                                    <span className="block sm:inline">{message}</span>
                                </div>
                            )}
                            
                            {status === "error" && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                    <span className="block sm:inline">{message}</span>
                                </div>
                            )}
                            
                            <button 
                                onClick={handleTransfer}
                                disabled={isLoading} 
                                className={`justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full ${
                                    isLoading ? "bg-gray-400" : "bg-green-500"
                                } text-white`}
                            >
                                {isLoading ? "Processing..." : "Initiate Transfer"}
                            </button>
                            
                            {status === "success" && (
                                <button
                                    onClick={() => navigate("/dashboard")}
                                    className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-gray-200 text-gray-800"
                                >
                                    Back to Dashboard
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};