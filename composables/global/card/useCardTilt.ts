export const useCardTilt = () => {
  const cardRef = ref<HTMLElement | null>(null)
  const isHovered = ref(false)
  const mouseX = ref(50)
  const mouseY = ref(50)

  const shineStyle = computed(() => ({
    background: `radial-gradient(circle at ${mouseX.value}% ${mouseY.value}%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 38%)`,
  }))

  function onMouseMove(e: MouseEvent) {
    const el = e.currentTarget as HTMLElement
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2

    const tiltX = -((y - cy) / cy) * 12
    const tiltY = ((x - cx) / cx) * 18
    mouseX.value = (x / rect.width) * 100
    mouseY.value = (y / rect.height) * 100

    if (!cardRef.value) return
    cardRef.value.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.2) translateY(-20px)`
  }

  function applyTilt() {
    isHovered.value = true
  }

  function resetTilt() {
    isHovered.value = false
    if (!cardRef.value) return
    cardRef.value.style.transform = ''
  }

  return { cardRef, shineStyle, onMouseMove, applyTilt, resetTilt }
}