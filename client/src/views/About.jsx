import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const AdminPage = () => {
    return (
        <div>
            <NavBar />
            <main className='w-2/3 mx-auto p-5 h-screen'>
                <h1 className="text-4xl font-bold tracking-tight text-dark-blue">About Us</h1>
            </main>
            <Footer />
        </div>
    );
}

export default AdminPage;