export default function Cart() {
  return (
    <section id="cart" className=" group overflow-hidden relative py-32">
      Cart
      <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-purple-500 transition-transform duration-300 group-hover:scale-x-100" />
      <a
        href="#projects"
        className="bg-gradient-to-r from-purple-500 to-purple-500 bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-300 hover:bg-[length:100%_2px]"
      >
        Projects
      </a>
    </section>
  );
}
