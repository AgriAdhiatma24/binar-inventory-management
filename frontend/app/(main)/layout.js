import RightSide from '@/components/right-side';
import Sidebar from '@/components/sidebar';

export default function MainLayout({ children }) {
  return (
    <div className='container'>
      <Sidebar />
      {children}
      <RightSide />
    </div>
  );
}
