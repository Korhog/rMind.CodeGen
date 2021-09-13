namespace rMind.Core.Api
{
    /// <summary>
    /// Base request to create wire 
    /// </summary>
    public class CreateWireRequest
    {
        /// <summary>
        /// Pin A guid.
        /// </summary>
        public Guid A { get; set; }

        /// <summary>
        /// Pin B guid.
        /// </summary>
        public Guid B { get; set; }
    }
}
