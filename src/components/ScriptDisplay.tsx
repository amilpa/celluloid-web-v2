import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Download, Copy, Check, Book, Edit, Loader2 } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
interface ScriptDisplayProps {
  title: string
  synopsis: string
  script: string
}

const ScriptDisplay = ({ title, synopsis, script }: ScriptDisplayProps) => {
  const [copied, setCopied] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pages, setPages] = useState<string[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [editableScript, setEditableScript] = useState(script)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [processingPage, setProcessingPage] = useState(0)
  const [dots, setDots] = useState('')

  useEffect(() => {
    const calculateLinesPerPage = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight
        const lineHeight = parseFloat(
          getComputedStyle(containerRef.current).lineHeight
        )
        return Math.floor(containerHeight / lineHeight)
      }
      return 25 // Default value
    }

    const splitScriptIntoPages = (script: string, linesPerPage: number) => {
      const scriptLines = script.split('\n')
      const pagesArray: string[] = []

      for (let i = 0; i < scriptLines.length; i += linesPerPage) {
        pagesArray.push(scriptLines.slice(i, i + linesPerPage).join('\n'))
      }

      if (pagesArray.length === 0) {
        pagesArray.push(script)
      }

      return pagesArray
    }

    const linesPerPage = calculateLinesPerPage()
    const pagesArray = splitScriptIntoPages(script, linesPerPage)

    setPages(pagesArray)
    setTotalPages(pagesArray.length)
    setEditableScript(script)
  }, [script, containerRef])

  useEffect(() => {
    // Only run animation when generating
    if (!isGenerating) return

    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev === '...') return ''
        return prev + '.'
      })
    }, 500)

    return () => clearInterval(dotsInterval)
  }, [isGenerating])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(editableScript)
      setCopied(true)
      toast({
        title: 'Copied to clipboard',
        description: 'Script has been copied to your clipboard',
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: 'Copy failed',
        description: 'Could not copy to clipboard',
        variant: 'destructive',
      })
    }
  }

  const downloadScript = () => {
    const element = document.createElement('a')
    const file = new Blob([editableScript], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `${title.replace(/\s+/g, '_')}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    toast({
      title: 'Downloaded',
      description: 'Script has been downloaded successfully',
    })
  }

  const downloadPDF = async () => {
    // Store the current page to restore it after PDF generation
    const currentPageBackup = currentPage

    // Reset dots animation
    setDots('')

    // Add loading state
    setIsGenerating(true)
    setProcessingPage(0) // Reset processing page counter

    try {
      // Create a temporary div for rendering that won't be visible to the user
      const tempDiv = document.createElement('div')
      tempDiv.style.position = 'absolute'
      tempDiv.style.left = '-9999px'
      tempDiv.style.top = '-9999px'
      tempDiv.className = containerRef.current?.className || ''
      document.body.appendChild(tempDiv)

      // Show a loading toast
      const loadingToast = toast({
        title: 'Generating PDF',
        description: 'Creating PDF with all pages...',
      })

      // Process each page one by one
      for (let i = 0; i < totalPages; i++) {
        // Set the current page to generate the content
        setCurrentPage(i + 1)
        setProcessingPage(i + 1) // Update processing page indicator

        // Need to wait for React to update the DOM
        await new Promise((resolve) => setTimeout(resolve, 100))

        // Clone the current container content to the temp div
        if (containerRef.current) {
          tempDiv.innerHTML = containerRef.current.innerHTML
        }

        // Generate the image for this page
        const canvas = await html2canvas(tempDiv)
        const imgData = canvas.toDataURL('image/png')

        // Calculate PDF dimensions based on the canvas size
        // This maintains the aspect ratio of your content
        const width = canvas.width
        const height = canvas.height

        // Create a new PDF with custom dimensions (first page only)
        if (i === 0) {
          // Create PDF with dimensions that match the aspect ratio of the first page
          // Convert pixels to millimeters with a scaling factor for better fit
          const scaleFactor = 0.264583 // Convert pixels to mm (1 px = 0.264583 mm)
          const pdfWidth = width * scaleFactor
          const pdfHeight = height * scaleFactor

          // Initialize PDF with custom dimensions
          const pdf = new jsPDF({
            orientation: pdfHeight > pdfWidth ? 'portrait' : 'landscape',
            unit: 'mm',
            format: [pdfWidth, pdfHeight],
          })

          // Add the image to the PDF, filling the entire page
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)

          // For subsequent pages, add new pages with the same dimensions
          for (let j = 1; j < totalPages; j++) {
            setCurrentPage(j + 1)
            setProcessingPage(j + 1) // Update processing page indicator
            await new Promise((resolve) => setTimeout(resolve, 100))

            if (containerRef.current) {
              tempDiv.innerHTML = containerRef.current.innerHTML
            }

            const nextCanvas = await html2canvas(tempDiv)
            const nextImgData = nextCanvas.toDataURL('image/png')

            // Add a new page with the same dimensions
            pdf.addPage([pdfWidth, pdfHeight])
            pdf.addImage(nextImgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
          }

          // Save the PDF
          pdf.save(`${title.replace(/\s+/g, '_')}_complete.pdf`)
          break // Exit the main loop as we've handled all pages
        }
      }

      // Clean up
      document.body.removeChild(tempDiv)

      // Show success message
      toast({
        title: 'PDF Downloaded',
        description: `Complete script "${title}" has been saved as PDF with all ${totalPages} pages.`,
        variant: 'default',
      })
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast({
        title: 'Error',
        description: 'Failed to generate the PDF. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setProcessingPage(0)
      setCurrentPage(currentPageBackup)
      setIsGenerating(false)
    }
  }

  const navigateToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleScriptEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableScript(e.target.value)

    const calculateLinesPerPage = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight
        const lineHeight = parseFloat(
          getComputedStyle(containerRef.current).lineHeight
        )
        return Math.floor(containerHeight / lineHeight)
      }
      return 25 // Default value
    }

    const splitScriptIntoPages = (script: string, linesPerPage: number) => {
      const scriptLines = script.split('\n')
      const pagesArray: string[] = []

      for (let i = 0; i < scriptLines.length; i += linesPerPage) {
        pagesArray.push(scriptLines.slice(i, i + linesPerPage).join('\n'))
      }

      if (pagesArray.length === 0) {
        pagesArray.push(script)
      }

      return pagesArray
    }

    const linesPerPage = calculateLinesPerPage()
    const pagesArray = splitScriptIntoPages(e.target.value, linesPerPage)

    setPages(pagesArray)
    setTotalPages(pagesArray.length)
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    if (startPage > 1) {
      pageNumbers.push(
        <PaginationItem key="first">
          <PaginationLink onClick={() => navigateToPage(1)}>1</PaginationLink>
        </PaginationItem>
      )
      if (startPage > 2) {
        pageNumbers.push(<PaginationItem key="ellipsis-1">...</PaginationItem>)
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => navigateToPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<PaginationItem key="ellipsis-2">...</PaginationItem>)
      }
      pageNumbers.push(
        <PaginationItem key="last">
          <PaginationLink onClick={() => navigateToPage(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return pageNumbers
  }

  return (
    <>
      {/* Fixed position loading overlay that covers the entire viewport */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="mb-2 text-primary flex items-center">
              Generating{dots}
            </div>
            <p className="font-medium">
              Processing page {processingPage} of {totalPages}
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 mt-4 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${(processingPage / totalPages) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Please wait, this may take a moment
            </p>
          </div>
        </div>
      )}
      <div className="glass-card overflow-hidden animate-scale-in w-[1200px]">
        <div className="p-6 md:p-8 border-b">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-medium">{title}</h3>
              <p className="text-muted-foreground mt-1">{synopsis}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="flex gap-1 items-center"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? 'Copied' : 'Copy'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadScript}
                className="flex gap-1 items-center"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadPDF}
                className="flex gap-1 items-center"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="formatted-view" className="w-full">
          <div className="px-6 pt-4 border-b">
            <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
              <TabsTrigger
                value="formatted-view"
                className="flex gap-2 items-center"
              >
                <Book className="h-4 w-4" />
                Formatted View
              </TabsTrigger>
              <TabsTrigger
                value="edit-view"
                className="flex gap-2 items-center"
              >
                <Edit className="h-4 w-4" />
                Edit View
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="formatted-view" className="m-0">
            <div className="p-6 md:p-8 flex flex-col items-center">
              <div
                ref={containerRef}
                className="bg-white dark:bg-black border rounded-lg p-8 shadow-lg min-h-[500px] w-full max-w-6xl h-[800px] relative perspective-800 transform-gpu mb-6"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-100/50 to-transparent dark:from-gray-900/50 rounded-lg pointer-events-none" />
                <div className="max-w-6xl h-[700px] mx-auto font-mono overflow-scroll">
                  {pages[currentPage - 1]?.split('\n\n').map((paragraph, i) => {
                    // Format based on screenplay conventions
                    paragraph = paragraph.replace(/\*\*/g, '')
                    if (paragraph.match(/^# Scene \d+$/)) {
                      // Scene headings
                      paragraph = paragraph.replace(/^# /, '')
                      return (
                        <p
                          key={i}
                          className="font-bold my-4 underline underline-offset-4"
                        >
                          {paragraph}
                        </p>
                      )
                    } else if (paragraph.match(/^[A-Z][A-Za-z\s]+$/)) {
                      // Character names
                      return (
                        <p key={i} className="text-center my-2">
                          {paragraph}
                        </p>
                      )
                    } else if (
                      paragraph.includes('(') &&
                      paragraph.includes(')')
                    ) {
                      // Parentheticals
                      return (
                        <p key={i} className="text-center italic my-1">
                          {paragraph}
                        </p>
                      )
                    } else {
                      // Action or dialogue
                      paragraph = paragraph.replace(/# ([A-Z])/g, '$1')
                      return (
                        <p key={i} className="my-3">
                          {paragraph}
                        </p>
                      )
                    }
                  })}
                </div>
                <div className="absolute bottom-2 right-4 text-xs text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </div>
              </div>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => navigateToPage(currentPage - 1)}
                      aria-disabled={currentPage === 1}
                      className={
                        currentPage === 1
                          ? 'pointer-events-none opacity-50'
                          : ''
                      }
                    />
                  </PaginationItem>

                  {renderPageNumbers()}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => navigateToPage(currentPage + 1)}
                      aria-disabled={currentPage === totalPages}
                      className={
                        currentPage === totalPages
                          ? 'pointer-events-none opacity-50'
                          : ''
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </TabsContent>

          <TabsContent value="edit-view" className="m-0">
            <div className="p-6 md:p-8 flex flex-col items-center">
              <div
                ref={containerRef}
                className="bg-white dark:bg-black border rounded-lg p-8 shadow-lg min-h-[500px] h-[800px] w-full max-w-6xl relative perspective-800 transform-gpu mb-6"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-100/50 to-transparent dark:from-gray-900/50 rounded-lg pointer-events-none" />
                <Textarea
                  className="font-mono w-full h-[700px] bg-transparent border-none focus-visible:ring-0 resize-none"
                  value={pages[currentPage - 1] || ''}
                  onChange={(e) => {
                    // Update just this page in the script
                    const newPages = [...pages]
                    newPages[currentPage - 1] = e.target.value
                    setPages(newPages)
                    setEditableScript(newPages.join('\n\n'))
                  }}
                />
                <div className="absolute bottom-2 right-4 text-xs text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </div>
              </div>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => navigateToPage(currentPage - 1)}
                      aria-disabled={currentPage === 1}
                      className={
                        currentPage === 1
                          ? 'pointer-events-none opacity-50'
                          : ''
                      }
                    />
                  </PaginationItem>

                  {renderPageNumbers()}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => navigateToPage(currentPage + 1)}
                      aria-disabled={currentPage === totalPages}
                      className={
                        currentPage === totalPages
                          ? 'pointer-events-none opacity-50'
                          : ''
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default ScriptDisplay
