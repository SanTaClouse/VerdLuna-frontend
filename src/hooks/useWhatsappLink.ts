import { useState } from "react";
import pedidosService from "../services/pedidosService";

/**
 * Custom hook para enviar mensajes por WhatsApp desde el dashboard
 *
 * IMPORTANTE: Usa window.location.href en lugar de window.open para
 * compatibilidad con iPhone/Safari, ya que los deep links de WhatsApp
 * son bloqueados cuando se abren en nuevas pestañas o desde código async.
 *
 * @example
 * const { sendWhatsapp, loading } = useWhatsappLink();
 *
 * <Button onClick={() => sendWhatsapp(pedido.id)} disabled={loading}>
 *   {loading ? "Enviando..." : "Enviar WhatsApp"}
 * </Button>
 */
export function useWhatsappLink() {
  const [loading, setLoading] = useState(false);

  /**
   * Envía un mensaje por WhatsApp y marca el pedido como enviado
   *
   * @param pedidoId - ID del pedido a enviar
   * @returns Promise<void>
   */
  const sendWhatsapp = async (pedidoId: string | number) => {
    try {
      setLoading(true);

      // 1. Obtener link desde backend
      const linkResp = await pedidosService.getWhatsappLink(pedidoId);
      if (!linkResp.success || !linkResp.data) {
        console.error("No se pudo obtener el link de WhatsApp");
        return;
      }

      const whatsappUrl = linkResp.data.whatsappLink;

      // 2. Marcar como enviado ANTES de navegar
      // Esto es crítico porque Safari puede interrumpir la ejecución de JS
      // al cambiar la URL con window.location.href
      await pedidosService.marcarWhatsappEnviado(pedidoId);

      // 3. Abrir WhatsApp en la misma pestaña (iPhone/Safari friendly)
      // window.open('_blank') es bloqueado por Safari para deep links
      // window.location.href funciona en todos los dispositivos
      window.location.href = whatsappUrl;

    } catch (err) {
      console.error("Error enviando WhatsApp:", err);
      setLoading(false); // Solo en error, porque si sale bien, la página se va a redirigir
    }
  };

  return { sendWhatsapp, loading };
}