export default function Custom404() {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold text-red-600">404 – Page Not Found</h1>
      <p className="mt-4">
        Looks like you're lost. Go <a className="text-blue-500 underline" href="/">home</a>.
      </p>
    </div>
  );
}
