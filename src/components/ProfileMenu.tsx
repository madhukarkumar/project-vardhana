import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../hooks/useAuth'
import { classNames } from '../utils/classNames'

export default function ProfileMenu() {
  const { user, session, signOut } = useAuth()

  if (!session || !user) {
    return null
  }

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="sr-only">Open user menu</span>
          {user?.user_metadata?.avatar_url ? (
            <img
              className="h-8 w-8 rounded-full"
              src={user.user_metadata.avatar_url}
              alt=""
            />
          ) : (
            <UserCircleIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={signOut}
                className={classNames(
                  active ? 'bg-red-500' : 'bg-gradient-to-r from-red-500 to-red-600',
                  'flex w-full px-4 py-2 text-sm text-white hover:from-red-600 hover:to-red-700 transition-all duration-300'
                )}
              >
                Logout
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
