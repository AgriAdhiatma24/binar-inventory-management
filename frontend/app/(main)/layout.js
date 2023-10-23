import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import RightSide from '@/components/right-side';

export default function MainLayout({ children }) {
  return (
    <div className='grid grid-cols-[max-content,1fr] p-8 gap-x-8'>
      <Sidebar />
      <div>
        <Navbar />
        <main className='grid grid-col-[max-content,1fr]'>{children}</main>
      </div>
      {/* <RightSide /> */}
    </div>
  );
}