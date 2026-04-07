export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-white/5 py-8">
      <div className="container-max flex items-center justify-center">
        <p className="text-text-tertiary text-sm">
          © {new Date().getFullYear()} Muhammad Awais.
        </p>
      </div>
    </footer>
  );
}
