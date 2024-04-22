import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/login')
    }, [])
    return (
        <div>
            <p className="text-green-400">Home</p>
        </div>
    )
}

export default Home