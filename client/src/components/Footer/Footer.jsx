import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0">
          <Link to="/" className="flex items-center text-white hover:text-gray-400">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Home
          </Link>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-white hover:text-gray-400"
          >
            <FontAwesomeIcon icon={faInstagram} className="mr-2" />
            Instagram
          </a>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-white hover:text-gray-400"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
            WhatsApp
          </a>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <FontAwesomeIcon icon={faPhone} className="mr-2" />
          <span>9528620577</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
