using Newtonsoft.Json;

namespace rMind.Core.Nodes.Pins
{
    /// <summary>
    /// Base pin description
    /// </summary>
    public class Pin
    {
        /// <summary>
        /// Pin label.
        /// </summary>
        public string? Label { get; set; }

        /// <summary>
        /// Pin Id.
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Row span.
        /// </summary>
        public int RowSpan { get; set; } = 1;
    }
}
