import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../AuthContext'

export default function UserDropdown() {
  const { user, signOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.email) return '?'
    return user.email.charAt(0).toUpperCase()
  }

  return (
    <div className="user-dropdown" ref={dropdownRef}>
      <div
        className="user-dropdown-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="user-avatar">
          {getUserInitials()}
        </div>
      </div>

      {isOpen && (
        <div className="user-dropdown-menu">
          <div className="user-dropdown-menu-item">
            <UserIcon className="icon-sm" />
            <span>{user?.email}</span>
          </div>
          <Link to="/account" className="user-dropdown-menu-item">
            <Cog6ToothIcon className="icon-sm" />
            <span>Account Settings</span>
          </Link>
          <div className="user-dropdown-menu-item logout" onClick={signOut}>
            <ArrowRightOnRectangleIcon className="icon-sm" />
            <span>Sign Out</span>
          </div>
        </div>
      )}
    </div>
  )
}
