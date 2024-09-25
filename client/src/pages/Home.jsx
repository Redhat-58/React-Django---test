import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';

export default function Home() {
    const { user } = useAuth();
    const getUser = useUser();

    useEffect(() => {
        getUser();
    }, []);

    // Function to format Ethereum balance
    const formatEthBalance = (balance) => {
        if (balance === undefined) return 'N/A';
        const floatBalance = parseFloat(balance);
        if (floatBalance === 0) return '0';
        return floatBalance.toFixed(4);
    }

    return (
        <div className='container mt-3'>
            <h3>
                <div className='row'>
                    <div className="mb-12">
                        {user?.email !== undefined 
                            ? `List user Ethereum balance(${user.wallet_address}) : ${formatEthBalance(user?.eth_balance)} ETH` 
                            : 'Please login first'}
                    </div>
                </div>
            </h3>
        </div>
    )
}
