namespace rMind.Core.Api
{
    /// <summary>
    /// Base request to create node.
    /// </summary>
    public class CreateNodeRequest
    {
        /// <summary>
        /// Descriptor Guid.
        /// </summary>
        public Guid DescriptorId { get; set; }
    }
}
