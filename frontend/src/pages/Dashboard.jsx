import { Appbar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useState, useEffect } from "react"
import axios from "axios"

export const Dashboard = () => {
    const [balance, setBalance] = useState("0");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/account/balance", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                
                // Format the balance for display
                setBalance(response.data.balance.toLocaleString());
                setLoading(false);
            } catch (error) {
                console.error("Error fetching balance:", error);
                setLoading(false);
            }
        };

        fetchBalance();
    }, []);

    return(
        <div>
            <Appbar/>
            <div className="m-8">
                {loading ? (
                    <p>Loading balance...</p>
                ) : (
                    <Balance value={balance} />
                )}
                <Users/>
            </div>
        </div>
    )
}