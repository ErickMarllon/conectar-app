// import { Link, useLocation } from 'react-router-dom';
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from './ui/breadcrumb';
// import { Separator } from './ui/separator';
// import { SidebarTrigger } from './ui/sidebar';
// import React from 'react';

// const MAXPATHS = 2;
// interface PageHeaderProps {
//   maxpaths?: number;
// }
// export function PageHeader({ maxpaths = MAXPATHS }: PageHeaderProps) {
//   const location = useLocation();
//   const paths = location.pathname.split('/').filter(Boolean);
//   const lastPaths = paths?.pop();

//   return (
//     <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
//       <div className="flex items-center gap-2 px-4">
//         <SidebarTrigger className="-ml-1" />
//         <Separator orientation="vertical" className="mr-2 h-4" />
//         <Breadcrumb>
//           <BreadcrumbList>
//             {paths?.map((path, index) => (
//               <React.Fragment key={index}>
//                 <BreadcrumbItem className="hidden md:block">
//                   {index < maxpaths ? (
//                     <BreadcrumbLink asChild>
//                       <Link to={`/${path}`}>{path}</Link>
//                     </BreadcrumbLink>
//                   ) : (
//                     <BreadcrumbPage>{lastPaths}</BreadcrumbPage>
//                   )}
//                 </BreadcrumbItem>
//                 {index < maxpaths && <BreadcrumbSeparator className="hidden md:block" />}
//               </React.Fragment>
//             ))}
//           </BreadcrumbList>
//         </Breadcrumb>
//       </div>
//     </header>
//   );
// }
