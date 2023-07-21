import React from "react"
import { useLocation } from "react-router-dom"
import SuccessPage from "./SuccessPage"
import CanceledPage from "./CanceledPage"

const PaymentStatusPage = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const success = queryParams.get("success") === "true"

    return (
        <div>
            {success ? (
                <SuccessPage />
            ) : (
                <CanceledPage />
            )}
        </div>
    )
}

export default PaymentStatusPage