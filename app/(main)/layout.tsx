import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { SubNav } from '../../components/SubNav';
import { RightSidebar } from '../../components/RightSidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <RightSidebar />
            <div className="mt-[78px] sm:mt-[72px] lg:ml-[220px]">
                <SubNav />
                {children}
                <Footer />
            </div>
        </>
    );
}