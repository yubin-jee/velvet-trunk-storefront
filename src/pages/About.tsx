import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <section className="relative overflow-hidden bg-blush-100">
        <div className="absolute inset-0 opacity-60">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blush-100/30 via-blush-100/50 to-cream-50" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 py-28 text-center">
          <span className="eyebrow">Our Story</span>
          <h1 className="mt-4 font-display text-5xl italic leading-[1.05] text-ink-900 sm:text-6xl">
            Founded on a rainy afternoon<br />in Yeonnam-dong.
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-2">
        <div>
          <p className="font-display text-2xl italic leading-relaxed text-ink-900">
            Velvet Trunk began with an old suitcase — my grandmother's, lined in faded plum velvet
            — filled with the small, precious things women pass down.
          </p>
        </div>
        <div className="space-y-5 text-sm leading-relaxed text-ink-700">
          <p>
            A pair of hairpins. A hand-embroidered ribbon. A letter folded into a square no
            bigger than a postage stamp. Opening it felt like discovering a secret room in a
            house you'd lived in your whole life.
          </p>
          <p>
            We set out to create a brand of things that could, someday, live inside a trunk
            like that. Dainty jewelry, soft silk accessories, considered pieces of clothing —
            all made in very small batches, in Seoul and outside Busan, by people we know by
            name.
          </p>
          <p>
            Nothing here is loud. Everything here is meant to be worn, loved, and eventually
            handed to someone you love.
          </p>
        </div>
      </section>

      <section className="bg-cream-100">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-20 sm:grid-cols-3">
          {[
            {
              title: "Small batches",
              body:
                "Most pieces are limited to fewer than fifty. When they're gone, they're gone — or they return, softly, in a new color.",
            },
            {
              title: "Made with people",
              body:
                "Every maker we work with is family-run or independent. We visit. We share meals. We pay up front.",
            },
            {
              title: "Quiet materials",
              body:
                "Freshwater pearls, 14k gold fill, mulberry silk, Italian velvet. Never plastic. Never synthetic shine.",
            },
          ].map((v) => (
            <div key={v.title}>
              <h3 className="font-display text-2xl italic">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-700">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <Link to="/shop" className="btn-primary">Shop the collection</Link>
      </section>
    </>
  );
}
