using rMind.Core.Nodes.Pins;

namespace rMind.Core.Nodes.Rows
{
    /// <summary>
    /// Row description.
    /// </summary>
    public class Row
    {
        /// <summary>
        /// Input pin (can be null).
        /// </summary>
        public Pin? InPin {  get; set; }

        /// <summary>
        /// Output pin (can be null).
        /// </summary>
        public Pin? OutPin {  get; set; }
    }
}
