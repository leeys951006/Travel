'use client';

import '../app/shared-plans/shared-plans.css';
import { useState, useEffect } from 'react';
import EmailList from '../components/EmailList';
import AddEmailModal from '../components/AddEmailModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import AddItemModal from '../components/AddItemModal';
import ItemList from '../components/ItemList';
import AddBox from '../components/AddBox';

interface PlansProps {
  emails: string[];  // emails prop을 받아오도록 정의
}

export default function Plans({ emails: initialEmails }: PlansProps) {
  const [emails, setEmails] = useState<string[]>(initialEmails);  // 초기 emails 상태 설정
  const [items, setItems] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [emailToDelete, setEmailToDelete] = useState<string | null>(null);

  const [sections, setSections] = useState<{ id: string; label: string }[]>([]);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const offset = window.innerHeight / 2 - section.getBoundingClientRect().height / 2;
      const position = section.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: position, behavior: 'smooth' });
    }
  };

  const addTab = (id: string, label: string) => {
    setSections((prevSections) => [...prevSections, { id, label }]);
  };

  const removeTab = (id: string) => {
    setSections((prevSections) => prevSections.filter((section) => section.id !== id));
  };

  const addItem = (item: string) => {
    if (item && !items.includes(item)) {
      setItems([...items, item]);
    }
  };

  const deleteItem = (item: string) => {
    setItems(items.filter((i) => i !== item));
  };

  const addEmail = (email: string) => {
    if (email && !emails.includes(email)) {
      setEmails([...emails, email]);
    }
  };

  const deleteEmail = () => {
    if (emailToDelete) {
      setEmails(emails.filter((e) => e !== emailToDelete));
      setEmailToDelete(null);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="shared-plans-container">
      
      <div className="middle-content">
        
        <div className="content">
          <h1>공유계획</h1>

          <div className="section-tabs">
            {sections.map((section, index) => (
              <button
                key={index}
                className="section-tab"
                onClick={() => scrollToSection(section.id)}
              >
                {section.label}
              </button>
            ))}
          </div>

          <EmailList emails={emails} onDelete={(email) => setEmailToDelete(email)} />

          <div className="button-container">
            <button className="member-button" onClick={() => setIsModalOpen(true)}>
              멤버 추가
            </button>
          </div>

          <ItemList items={items} onDelete={deleteItem} />
          <div className="button-container">
            <button className="location-button" onClick={() => setIsItemModalOpen(true)}>
              여행 지역, 국가 추가
            </button>
          </div>

          <AddBox onAddTab={addTab} onRemoveTab={removeTab} />

          <AddEmailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={addEmail} />
          <AddItemModal isOpen={isItemModalOpen} onClose={() => setIsItemModalOpen(false)} onAdd={addItem} />
          <DeleteConfirmationModal emailToDelete={emailToDelete} onConfirm={deleteEmail} onCancel={() => setEmailToDelete(null)} />

          <button className={`scroll-to-top ${showScrollToTop ? 'show' : ''}`} onClick={scrollToTop}>
            ▲
          </button>
        </div>
        
      </div>
    </div>
  );
}
