import  { ModelViewer }  from "./components/CarModel"; // Ensure correct import

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <ModelViewer />
    </div>
  );
}
