"use client"
import Header from '@/components/layout/Header';
import React, { useState } from 'react';

const SubmissionForm = () => {
    const [submission, setSubmission] = useState({
        title: '',
        content: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubmission((prevSubmission) => ({
            ...prevSubmission,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted:', submission);
        // You can add your submission handling logic here
    };

    return (
        <>
        <Header/>
        <div className="flex justify-center items-center min-h-screen bg-shade">
            <form onSubmit={handleSubmit} className="mt-20 mb-20 shadow-xl w-full md:w-1/2 lg:w-1/3 bg-white p-8 rounded-lg shadow-lg">
                <h2 className="italic text-3xl font-semibold mb-6 text-center text-primary">Track Submission Form</h2>
                <div className="mb-6">
                    <label htmlFor="title" className="block text-gray-800 font-semibold mb-2">Song Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={submission.title}
                        onChange={handleChange}
                        className="border rounded-md p-3 w-full focus:outline-none focus:border-blue-500"
                        placeholder="Enter title"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="title" className="block text-gray-800 font-semibold mb-2">Curator</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={submission.title}
                        onChange={handleChange}
                        className="border rounded-md p-3 w-full focus:outline-none focus:border-blue-500"
                        placeholder="Enter title"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="title" className="block text-gray-800 font-semibold mb-2">Track URL</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={submission.title}
                        onChange={handleChange}
                        className="border rounded-md p-3 w-full focus:outline-none focus:border-blue-500"
                        placeholder="Enter title"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="title" className="block text-gray-800 font-semibold mb-2">Release Date</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={submission.title}
                        onChange={handleChange}
                        className="border rounded-md p-3 w-full focus:outline-none focus:border-blue-500"
                        placeholder="Enter title"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="content" className="block text-gray-800 font-semibold mb-2">Song Description</label>
                    <p className='text-xs text-gray-600 shadow-sm'>Write a description for your song</p>
                    <textarea
                        id="content"
                        name="content"
                        value={submission.content}
                        onChange={handleChange}
                        className="border rounded-md p-3 w-full h-32 resize-none focus:outline-none focus:border-blue-500"
                        placeholder="Enter content"
                    ></textarea>
                </div>
                <button
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
        </>
    );
};

export default SubmissionForm;
