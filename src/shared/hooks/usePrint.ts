import { useEffect, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

interface UsePrintOptions {
	documentTitle?: string
	onAfterPrint?: () => void
}

const usePrint = ({
	documentTitle = 'Document',
	onAfterPrint
}: UsePrintOptions = {}) => {
	const printRef = useRef<HTMLDivElement>(null)

	const handlePrint = useReactToPrint({
		content: () => printRef.current,
		documentTitle,
		onAfterPrint
	})

	useEffect(() => {
		return () => {
			if (onAfterPrint) {
				onAfterPrint()
			}
		}
	}, [onAfterPrint])

	return { printRef, handlePrint }
}
export default usePrint
