import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {currentYear} Attimi. All rights reserved.</p>
        <div className="flex justify-center mt-2">
          <a
            href="https://www.instagram.com/attimiph"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2"
          >
            <i className="fab fa-instagram text-2xl"></i>
          </a>
          <a
            href="https://github.com/TommasoAttimi"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2"
          >
            <i className="fab fa-github text-2xl"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
