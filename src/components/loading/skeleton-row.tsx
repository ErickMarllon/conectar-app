import { Avatar, AvatarFallback } from '../ui/avatar';

export const SkeletonUserRow = () => {
  return (
    <tr className="border-border hover:bg-muted animate-pulse border-y first:border-t-0 last:border-b-0">
      <td className="flex items-center gap-3 p-4">
        <Avatar className="h-10 w-10">
          <AvatarFallback />
        </Avatar>
        <div className="pw-4 w-40">
          <div className="mb-2 h-4 w-2/3 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </td>

      <td className="p-4">
        <div className="relative flex h-3 w-21.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </td>
      <td className="p-4">
        <div className="h-3 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
      </td>

      <td className="p-4">
        <div className="h-3 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
      </td>
      <td className="p-4">
        <div className="h-3 w-32 rounded-full bg-gray-200 dark:bg-gray-700" />
      </td>
      <td className="p-4">
        <div className="h-3 w-32 rounded-full bg-gray-200 dark:bg-gray-700" />
      </td>
      <td className="p-4">
        <div className="h-8 w-3 rounded-full bg-gray-200 dark:bg-gray-700" />
      </td>
      <td className="sr-only" />
    </tr>
  );
};
