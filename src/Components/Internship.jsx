import React, { useState } from "react";
import { FaBriefcase, FaExpand } from "react-icons/fa";

const Internship = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <section id="Internship" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-orange-500/10 to-pink-500/5 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tl from-pink-500/10 to-orange-500/5 blur-3xl rounded-full"></div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section header */}
                <div className="flex flex-col items-center mb-16 reveal">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-pink-600 mb-5 shadow-glow">
                        <FaBriefcase className="text-white text-2xl" />
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-2">
                        Internship & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">Experience</span>
                    </h2>
                    <p className="text-gray-400 text-center max-w-2xl">
                        Professional experience and practical application of my skills in a real-world environment.
                    </p>
                    <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full mt-4"></div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-10">
                    {/* Left side - Certificate Image */}
                    <div className="md:w-1/2 w-full reveal">
                        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-4 shadow-xl overflow-hidden group relative">
                            <img
                                src="/Bluetsock.jpeg"
                                alt="Bluestock Internship Certificate"
                                className="w-full rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Overlay with expand button */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <h3 className="text-white text-xl font-bold mb-2">Bluestock Internship</h3>
                                <p className="text-gray-300 text-sm mb-2">Completion Certificate</p>
                                <button 
                                    className="self-center mt-2 bg-white/20 backdrop-blur-sm border border-white/30 p-2 rounded-full hover:bg-white/30 transition-colors duration-300"
                                    onClick={() => setSelectedImage("/Bluetsock.jpeg")}
                                    aria-label="View certificate"
                                >
                                    <FaExpand className="text-white" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Text Content */}
                    <div className="md:w-1/2 w-full mt-8 md:mt-0 reveal">
                        <div className="space-y-6 backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
                            <h3 className="text-2xl font-bold text-white">
                                Full Stack Development <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">Internship</span>
                            </h3>
                            <h4 className="text-xl font-semibold text-gray-300">Bluestock</h4>
                            <p className="text-gray-300 leading-relaxed">
                                Completed an enriching internship at Bluestock, where I gained hands-on experience in modern web development practices. I worked on developing and maintaining web applications, integrating APIs, and collaborating with a team to deliver high-quality software solutions.
                            </p>
                            <p className="text-gray-400">
                                This experience allowed me to apply my theoretical knowledge to real-world projects, enhancing my problem-solving skills and teaching me the importance of writing clean, maintainable code in a professional setting.
                            </p>
                            
                            {/* Skills badges */}
                            <div className="pt-4">
                                <h4 className="text-lg font-medium text-white mb-3">Skills Gained:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {["Web Development", "API Integration", "Team Collaboration", "Problem Solving", "Clean Code"].map((skill, i) => (
                                        <span 
                                            key={i}
                                            className="px-3 py-1 rounded-full text-sm bg-gradient-to-r from-orange-500/20 to-pink-600/20 border border-orange-500/30 text-gray-200"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Certificate Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
                    <div className="relative max-w-4xl w-full bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10" onClick={(e) => e.stopPropagation()}>
                        <button 
                            className="absolute -top-4 -right-4 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center z-10"
                            onClick={() => setSelectedImage(null)}
                            aria-label="Close"
                        >
                            ✕
                        </button>
                        <img 
                            src={selectedImage}
                            alt="Bluestock Internship Certificate"
                            className="w-full rounded-lg"
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default Internship;
