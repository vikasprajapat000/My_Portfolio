import React, { useState, useEffect } from 'react';
import { FaHome, FaUser, FaBriefcase, FaLaptopCode, FaEnvelope, FaSearch } from "react-icons/fa";

const Navbar = ({ activeSection }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Sections matching your actual components
    const sections = [
        { id: "home", name: "Home", icon: <FaHome /> },
        { id: "about", name: "About", icon: <FaUser /> },
        { id: "projects", name: "Projects", icon: <FaBriefcase /> },
        { id: "technologies", name: "Skills", icon: <FaLaptopCode /> },
        { id: "contact", name: "Contact", icon: <FaEnvelope /> }
    ];

    // Update navbar background on scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const normalizeId = (value) => value?.toLowerCase().trim();

    // Smooth scroll
    const scrollToSection = (id) => {
        const sectionId = normalizeId(id);
        const idMap = { 'skills': 'technologies' };
        const targetId = idMap[sectionId] || sectionId;

        const section = Array.from(document.querySelectorAll('[id]')).find(
            (el) => normalizeId(el.id) === targetId
        );

        if (section) {
            const headerHeight = document.querySelector('.fixed-navbar')?.offsetHeight || 70;
            const elementPosition = section.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerHeight;

            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        } else {
            console.warn(`Section with id "${targetId}" not found`);
        }
        setIsOpen(false);
    };

    // Handle search
    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        const found = sections.find(
            (s) => s.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (found) {
            scrollToSection(found.id);
            setSearchTerm("");
        } else {
            alert("Section not found!");
        }
    };

    return (
        <nav className={`fixed-navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                
                {/* Logo + Circle Search */}
                <div className="navbar-brand">
                    <button onClick={() => scrollToSection('home')} className="navbar-logo-button">
                        <div className="navbar-logo">
                            <span>VP</span>
                        </div>
                    </button>

                    {/* Circle-style search bar beside VP logo */}
                    <form className="navbar-search" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit"><FaSearch /></button>
                    </form>
                </div>

                {/* Navigation Links */}
                <div className="navbar-links-container">
                    <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
                        {sections.map((section) => {
                            const activeSectionId = normalizeId(activeSection);
                            const sectionIdLower = normalizeId(section.id);
                            const isActive = activeSectionId === sectionIdLower || (sectionIdLower === 'technologies' && activeSectionId === 'skills');

                            return (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className={`navbar-link ${isActive ? 'active' : ''}`}
                                >
                                    <span className="navbar-icon">{section.icon}</span>
                                    <span className="navbar-text">{section.name}</span>
                                    {isActive && <div className="navbar-active-indicator"></div>}
                                </button>
                            );
                        })}
                    </div>

                    {/* Hamburger */}
                    <button
                        className={`navbar-toggle ${isOpen ? 'open' : ''}`}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="toggle-bar"></div>
                        <div className="toggle-bar"></div>
                        <div className="toggle-bar"></div>
                    </button>
                </div>
            </div>

            {/* Styles */}
            <style jsx>{`
                .fixed-navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 70px;
                    z-index: 100;
                    transition: all 0.3s ease;
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(10px);
                }
                .fixed-navbar.scrolled {
                    background: rgba(0, 0, 0, 0.85);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                }
                .navbar-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 1.25rem;
                }
                .navbar-brand {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                .navbar-logo {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: linear-gradient(to right, #3b82f6, #6366f1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    font-size: 18px;
                    box-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
                }

                /* Circle Search Bar */
                .navbar-search {
                    display: flex;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.15);
                    border-radius: 9999px; /* Makes it fully rounded */
                    padding: 0.2rem 0.6rem;
                    transition: all 0.3s ease;
                }
                .navbar-search input {
                    padding: 0.4rem 0.6rem;
                    border: none;
                    outline: none;
                    background: transparent;
                    color: white;
                    font-size: 0.85rem;
                    width: 120px;
                    transition: width 0.3s ease;
                }
                .navbar-search input:focus {
                    width: 180px; /* Expands on focus */
                }
                .navbar-search input::placeholder {
                    color: rgba(255, 255, 255, 0.6);
                }
                .navbar-search button {
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1rem;
                    padding: 0.3rem;
                    border-radius: 50%;
                    transition: background 0.3s ease;
                }
                .navbar-search button:hover {
                    background: rgba(255, 255, 255, 0.2);
                }

                .navbar-links-container {
                    display: flex;
                    align-items: center;
                }
                .navbar-links {
                    display: flex;
                    gap: 1rem;
                }
                .navbar-link {
                    position: relative;
                    background: transparent;
                    border: none;
                    color: white;
                    padding: 0.5rem 0.75rem;
                    cursor: pointer;
                    font-size: 0.9rem;
                    opacity: 0.7;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    border-radius: 0.25rem;
                }
                .navbar-link:hover,
                .navbar-link.active {
                    opacity: 1;
                    background: rgba(255, 255, 255, 0.05);
                }
                .navbar-active-indicator {
                    position: absolute;
                    bottom: -1px;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    border-radius: 1px;
                    background: linear-gradient(to right, #3b82f6, #6366f1);
                }

                .navbar-toggle {
                    display: none;
                    flex-direction: column;
                    justify-content: space-between;
                    width: 24px;
                    height: 18px;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 0;
                    z-index: 10;
                }
                .toggle-bar {
                    width: 100%;
                    height: 2px;
                    background-color: white;
                    border-radius: 1px;
                    transition: all 0.3s ease;
                }
                .navbar-toggle.open .toggle-bar:nth-child(1) {
                    transform: translateY(8px) rotate(45deg);
                }
                .navbar-toggle.open .toggle-bar:nth-child(2) {
                    opacity: 0;
                }
                .navbar-toggle.open .toggle-bar:nth-child(3) {
                    transform: translateY(-8px) rotate(-45deg);
                }

                @media (max-width: 768px) {
                    .navbar-search {
                        display: none; /* Hide search on mobile */
                    }
                    .navbar-links {
                        position: fixed;
                        top: 70px;
                        right: -100%;
                        width: 240px;
                        background: rgba(0, 0, 0, 0.9);
                        backdrop-filter: blur(10px);
                        flex-direction: column;
                        padding: 1rem;
                        transition: all 0.3s ease;
                        border-radius: 0 0 0 0.75rem;
                        box-shadow: -4px 4px 20px rgba(0, 0, 0, 0.3);
                    }
                    .navbar-links.open {
                        right: 0;
                    }
                    .navbar-link {
                        width: 100%;
                        justify-content: flex-start;
                        padding: 0.75rem 1rem;
                    }
                    .navbar-active-indicator {
                        left: 0;
                        bottom: 0;
                        width: 3px;
                        height: 100%;
                    }
                    .navbar-toggle {
                        display: flex;
                    }
                }

                .navbar-logo-button {
                    background: transparent;
                    border: none;
                    padding: 0;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                }
                .navbar-logo-button:hover {
                    transform: scale(1.05);
                }
                .navbar-logo-button:active {
                    transform: scale(0.98);
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
