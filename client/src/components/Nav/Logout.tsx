import { forwardRef } from 'react';
import { useAuthContext } from '~/hooks/AuthContext';
import { LogOutIcon } from '~/components/svg';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';
import { useWorkspace } from '../dashboardFalitech/workspaceContext';

const Logout = forwardRef<HTMLButtonElement, { className?: string }>((props, ref) => {
  const { logout } = useAuthContext();
  const localize = useLocalize();
  const { selectedWorkspace, selectWorkspace } = useWorkspace();

  function handlerClick(){
    selectWorkspace(null);
    logout();
  }

  return (
    <button
      ref={ref}
      className={cn(
        'group group flex w-full cursor-pointer items-center gap-2 rounded p-2.5 text-sm text-text-primary transition-colors duration-200 hover:bg-surface-hover data-[focus]:bg-surface-hover',
        props.className ?? '',
      )}
      onClick={handlerClick}
    >
      <LogOutIcon />
      {localize('com_nav_log_out')}
    </button>
  );
});

export default Logout;
