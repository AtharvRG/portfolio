// src/components/resume/sections/CoursesSection.tsx
'use client';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { ExternalLink } from 'lucide-react';

const courses = [
    { title: "Developing Front-End Apps with React", provider: "IBM - Coursera", link: "https://www.coursera.org/account/accomplishments/certificate/SBMFJSDQZHVK" },
    { title: "Frontend Development using Angular", provider: "Board Infinity - Coursera", link: "https://www.coursera.org/account/accomplishments/certificate/OKSYWN90QOIQ" },
    { title: "Mathematics for Machine Learning: Linear Algebra", provider: "Imperial College London - Coursera", link: "https://www.coursera.org/account/accomplishments/certificate/3BUR9KYAWGSQ" },
    { title: "Programming with Generative AI", provider: "IIT Guwahati - Coursera", link: "https://www.coursera.org/account/accomplishments/certificate/4V9QX7KAI3TV" },
];

export default function CoursesSection() {
    return (
        <section className="py-16">
            <SectionHeader title="Certifications & Courses" />
            <div className="space-y-4">
                {courses.map((course, index) => (
                    <motion.div
                        key={index}
                        className="bg-dark-card p-4 rounded-lg flex justify-between items-center border border-transparent hover:border-olive"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <div>
                            <h3 className="font-wistle text-off-white">{course.title}</h3>
                            <p className="font-gotham text-sm text-pink-light/70">{course.provider}</p>
                        </div>
                        <a
                            href={course.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-light/50 hover:text-accent-cyan transition-colors"
                        >
                            <ExternalLink size={18} />
                        </a>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}