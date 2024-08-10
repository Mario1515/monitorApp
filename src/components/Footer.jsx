import React from 'react';
import { GithubOutlined } from '@ant-design/icons';

const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 p-4 text-black font-mono items-center space-x-4 hidden lg:flex">
            <a 
                href="https://my-portfolio-qlv1.onrender.com/" 
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-lg text-black"
            >
                Created by Mario Petkov
            </a>
            <a
                href="https://github.com/Mario1515"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-white"
            >
                <GithubOutlined className="text-black text-3xl" /> 
                <span className="sr-only">GitHub Repo</span>
            </a>
        </footer>
    );
};

export default Footer;