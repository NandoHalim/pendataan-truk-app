const LEVELS = ['debug','info','warn','error']
const CURRENT = (import.meta.env.VITE_LOG_LEVEL || 'info').toLowerCase()
function shouldLog(l){ return LEVELS.indexOf(l) >= LEVELS.indexOf(CURRENT) }
export const log = {
  debug:(msg, ctx)=> shouldLog('debug') && console.debug('[DEBUG]', msg, ctx||{}),
  info:(msg, ctx)=> shouldLog('info') && console.info('[INFO]', msg, ctx||{}),
  warn:(msg, ctx)=> shouldLog('warn') && console.warn('[WARN]', msg, ctx||{}),
  error:(msg, ctx)=> shouldLog('error') && console.error('[ERROR]', msg, ctx||{}),
}
