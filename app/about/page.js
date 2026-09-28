import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: "About",
};

const About = () => {
    return (
        <div className="container mx-auto max-w-4xl px-6 py-16 text-paper">
            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">About Emberly</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper/70">
                Emberly is a crowdfunding platform that lets creators be funded by the people who enjoy their work.
                Supporters make a small payment, leave a message, and see themselves on the creator&apos;s leaderboard.
            </p>

            <h2 className="font-display mt-14 text-2xl font-bold">How it works</h2>
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="glass rounded-3xl p-6">
                    <h3 className="font-display text-xl font-semibold">Connect with fans</h3>
                    <p className="mt-2 text-paper/70">Fans can view your profile, see your projects, and leave meaningful messages of support.</p>
                </div>
                <div className="glass rounded-3xl p-6">
                    <h3 className="font-display text-xl font-semibold">Get paid directly</h3>
                    <p className="mt-2 text-paper/70">Receive contributions directly through Razorpay, with a transparent public leaderboard.</p>
                </div>
            </div>

            <Link href="/login" className="btn-primary mt-12">Create your page</Link>
        </div>
    );
};

export default About;