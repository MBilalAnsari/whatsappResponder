import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Respond = () => {
    const { queryId } = useParams();
    const [queryData, setQueryData] = useState(null);
    const [price, setPrice] = useState("");
    const whatsappLink = `https://wa.me/15551787272` 

    useEffect(() => {
        console.log("Fetching data for queryId:", queryId); // Debug log for queryId
        fetch(`https://lookup-dev-d8c5e8b91c4d.herokuapp.com/api/vendor/showQuery/${queryId}`)
            .then((res) => {
                console.log("Response status:", res.status); // Log response status
                return res.json();
            })
            .then((data) => {
                console.log("Fetched data:", data); // Log fetched data
                setQueryData(data);
            })
            .catch((err) => console.error("Error fetching query:", err));
    }, [queryId]);

    const sendPrice = async () => {
        console.log("Sending price:", price); // Debug log for price
        await fetch(`https://lookup-dev-d8c5e8b91c4d.herokuapp.com/api/vendor/sendPricing/${queryId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ priceReceived: price }),
        });
        alert("Price sent successfully!");
        window.location.href = whatsappLink; // Redirect to WhatsApp link
    };

    return (
        <div>
            <h2>Product Query</h2>
            {queryData ? (
                <div>
                    <p>Product Name: {queryData.product}</p>
                    {queryData.status === "answered" ? (
                        <div>
                            <p>Query has been answered.</p>
                        </div>
                    ) : (
                        <div>
                            <input
                                type="text"
                                placeholder="Enter Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <button onClick={sendPrice}>Send Price</button>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Respond;
