import { useRef, useState } from 'react'
import { Upload, FileText, X } from 'lucide-react'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  accept?: string
}

export default function FileUpload({ onFileSelect, accept = '.pdf' }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const dropped = e.dataTransfer.files[0]
    if (dropped && dropped.type === 'application/pdf') {
      setFile(dropped)
      onFileSelect(dropped)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) {
      setFile(selected)
      onFileSelect(selected)
    }
  }

  const handleRemove = () => {
    setFile(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div>
      <div
        className="file-drop-zone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleChange}
        />
        <div className="w-[72px] h-[72px] mx-auto mb-5 rounded-[22px] bg-white/40 backdrop-blur-xl border border-white/50 flex items-center justify-center shadow-liquid-md">
          <Upload size={30} className="text-[#007AFF]" />
        </div>
        <p className="text-[#1c1c1e] font-semibold text-[15px]">
          Drop your PDF here
        </p>
        <p className="text-[13px] text-[#8e8e93] mt-1.5">
          or click to browse your files
        </p>
        <div className="flex items-center justify-center gap-1.5 mt-3">
          <span className="text-[11px] text-[#aeaeb2] font-medium px-2.5 py-1 rounded-full bg-white/30 border border-white/40">
            PDF only
          </span>
        </div>
      </div>

      {file && (
        <div className="mt-4 glass rounded-[18px] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-[14px] bg-[rgba(0,122,255,0.08)] flex items-center justify-center">
              <FileText size={20} className="text-[#007AFF]" />
            </div>
            <div>
              <p className="text-[14px] font-semibold text-[#1c1c1e] leading-tight">{file.name}</p>
              <p className="text-[12px] text-[#8e8e93] mt-0.5">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[rgba(255,59,48,0.06)] transition-all duration-300"
          >
            <X size={15} className="text-[#8e8e93]" />
          </button>
        </div>
      )}
    </div>
  )
}
