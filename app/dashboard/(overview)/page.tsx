import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import { Suspense } from 'react'; //we are waiting for some condition and load the component
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton, } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';

export default async function Page() {
//  fetching "waterfall"

//   My solving
//   const totalPaidInvoices = (await fetchCardData()).totalPaidInvoices;
//   const totalPendingInvoices = (await fetchCardData()).totalPendingInvoices;
//   const numberOfInvoices = (await fetchCardData()).numberOfInvoices;
//   const numberOfCustomers = (await fetchCardData()).numberOfCustomers;

const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/*show RevenueChartSkeleton while RevenueChart is loading and don't touch the other elements of the page */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>

        <Suspense fallback={<LatestInvoicesSkeleton/>}>
          <LatestInvoices/>
        </Suspense>
        
      </div>
    </main>
  );
}