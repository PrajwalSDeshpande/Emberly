import Link from "next/link";

const paths = {
  page: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  chat: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  trophy: "M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3",
  wallet: "M3 7a2 2 0 0 1 2-2h13v4M3 7v10a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H5a2 2 0 0 1-2-2zM16 14h2",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM9 12l2 2 4-4",
};

function Icon({ name, className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}

const steps = [
  {
    title: "Sign in and claim your page",
    text: "Log in with GitHub, pick a username and add a profile picture and cover. Your page goes live at your own link.",
  },
  {
    title: "Connect your Razorpay account",
    text: "Add your Razorpay Key ID and Secret in the dashboard so every payment lands in your account.",
  },
  {
    title: "Share the link with your fans",
    text: "Supporters choose an amount, leave a message and pay through Razorpay. Confirmed payments show up on your page.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src="/bg-orbits.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-48 -top-40 w-225 max-w-none opacity-80"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 pb-20 pt-14 md:grid-cols-[1.1fr_0.9fr] md:pt-24">
          <div>
            <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Fans fuel the work. You keep creating.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70">
              Emberly gives every creator a page where supporters can back them with a small payment and a message.
              Payments go through Razorpay, and each one appears on your page once it is confirmed.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/login" className="btn-primary">Create your page</Link>
              <a href="#how" className="btn-ghost">See how it works</a>
            </div>
          </div>

          <img
            src="/hero.svg"
            alt="A glowing jar collecting sparks and supporter messages"
            className="mx-auto w-full max-w-md md:max-w-none"
          />
        </div>
      </section>

      {/* How it works: a real sequence */}
      <section id="how" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div className="md:sticky md:top-28 md:self-start">
            <h2 className="font-display text-4xl font-bold tracking-tight">From sign-in to first supporter</h2>
            <p className="mt-4 max-w-sm text-paper/70">
              Setting up takes a few minutes. There is nothing to install and no paperwork on our side.
            </p>
          </div>

          <ol className="space-y-5">
            {steps.map((s, i) => (
              <li key={s.title} className="glass flex gap-5 rounded-3xl p-6">
                <span className="font-display flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet/30 text-lg font-bold text-amber">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-paper/70">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Features: uneven bento */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="font-display max-w-2xl text-4xl font-bold tracking-tight">
          Everything a supporter needs, on one page
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-6">
          <div className="glass relative overflow-hidden rounded-3xl p-7 md:col-span-4">
            <Icon name="page" className="h-7 w-7 text-amber" />
            <h3 className="font-display mt-4 text-2xl font-semibold">A page that looks like you</h3>
            <p className="mt-2 max-w-md text-paper/70">
              Your profile picture, cover, name and running totals sit at the top, so fans see who they are backing before they pay.
            </p>
            <div className="relative mt-6 overflow-hidden rounded-2xl">
              <img src="/cover-placeholder.svg" alt="" className="h-32 w-full object-cover" />
              <img
                src="/avatar-placeholder.svg"
                alt=""
                className="absolute bottom-3 left-4 h-16 w-16 rounded-full border-4 border-night"
              />
            </div>
          </div>

          <div className="glass rounded-3xl p-7 md:col-span-2">
            <Icon name="chat" className="h-7 w-7 text-mint" />
            <h3 className="font-display mt-4 text-2xl font-semibold">Words with every payment</h3>
            <p className="mt-2 text-paper/70">Supporters can leave a note, and it shows up next to their name.</p>
          </div>

          <div className="glass rounded-3xl p-7 md:col-span-2">
            <Icon name="trophy" className="h-7 w-7 text-ember" />
            <h3 className="font-display mt-4 text-2xl font-semibold">A public leaderboard</h3>
            <p className="mt-2 text-paper/70">Top supporters are listed openly, so backing you feels like joining something.</p>
          </div>

          <div className="glass rounded-3xl p-7 md:col-span-4">
            <Icon name="wallet" className="h-7 w-7 text-violet-soft" />
            <h3 className="font-display mt-4 text-2xl font-semibold">Paid to your own Razorpay account</h3>
            <p className="mt-2 max-w-lg text-paper/70">
              You bring your own Razorpay keys. Emberly creates the order with them, so the money goes to you, not to a middleman.
            </p>
          </div>
        </div>
      </section>

      {/* Payment trust */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="glass grid items-center gap-8 rounded-3xl p-8 md:grid-cols-[0.5fr_1fr] md:p-12">
          <img src="/payment-success.svg" alt="Payment successful" className="mx-auto w-52 md:w-64" />
          <div>
            <Icon name="shield" className="h-7 w-7 text-mint" />
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight">A payment only counts once it is verified</h2>
            <p className="mt-3 max-w-xl leading-relaxed text-paper/70">
              Fans pay in Razorpay Checkout. Before a payment appears on your page, the server checks Razorpay&apos;s signature
              to confirm it is real. Unfinished or failed payments never reach your totals.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-violet via-[#4b2bd6] to-night-2 p-10 text-center md:p-16">
          <h2 className="font-display mx-auto max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Your first supporter is one link away
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-paper/80">Set up your page, share it, and let your audience keep the fire going.</p>
          <Link href="/login" className="btn-primary mt-8 bg-none bg-amber text-night">Create your page</Link>
        </div>
      </section>
    </>
  );
}