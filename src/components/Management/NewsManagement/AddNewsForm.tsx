"use client";

// src/components/Management/NewsManagement/AddNewsForm.tsx
import { useState } from 'react';
import Modal from '../../Modal';
import { buttonStyles } from "@/components/ui/Button";

type Props = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function AddNewsForm({ isOpen, onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: '',
    image: '',
    isFeatured: false,
    status: 'draft'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would make the actual API call to save the news article
      
      // Reset form and close modal on success
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        tags: '',
        image: '',
        isFeatured: false,
        status: 'draft'
      });
      
      onSuccess?.();
      onClose();
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create News Article" size="xl">
      <div className="bg-[var(--md-surface-container-lowest)] rounded-2xl shadow-sm border border-[var(--md-outline-variant)] p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-[var(--md-on-surface-variant)] mb-2">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter article title"
            className="w-full border border-[var(--md-outline-variant)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)] shadow-sm"
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium text-[var(--md-on-surface-variant)] mb-2">
            Excerpt *
          </label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Enter article excerpt (brief summary)"
            rows={3}
            className="w-full border border-[var(--md-outline-variant)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)] shadow-sm"
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-[var(--md-on-surface-variant)] mb-2">
            Content *
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Enter full article content"
            rows={8}
            className="w-full border border-[var(--md-outline-variant)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)] shadow-sm"
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-[var(--md-on-surface-variant)] mb-2">
            Featured Image URL
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full border border-[var(--md-outline-variant)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)] shadow-sm"
            disabled={isSubmitting}
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-[var(--md-on-surface-variant)] mb-2">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Enter tags separated by commas (e.g., Premier Division, Highlights, Video)"
            className="w-full border border-[var(--md-outline-variant)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)] shadow-sm"
            disabled={isSubmitting}
          />
          <p className="text-sm text-[var(--md-on-surface-variant)] mt-1">
            Separate multiple tags with commas
          </p>
        </div>

        {/* Featured Article Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="h-4 w-4 text-[var(--md-primary)] focus:ring-[var(--md-primary)] border-[var(--md-outline-variant)] rounded"
            disabled={isSubmitting}
          />
          <label className="ml-2 block text-sm text-[var(--md-on-surface-variant)]">
            Mark as Featured Article
          </label>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-[var(--md-on-surface-variant)] mb-2">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-[var(--md-outline-variant)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)] shadow-sm"
            disabled={isSubmitting}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] -mx-6 px-6 py-4 rounded-lg">
          <button
            type="button"
            onClick={handleClose}
            className={buttonStyles({ variant: "outline", size: "sm", className: "flex-1" })}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={buttonStyles({ size: "sm", className: "flex-1" })}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Article'}
          </button>
        </div>
        </form>
      </div>
    </Modal>
  );
}
