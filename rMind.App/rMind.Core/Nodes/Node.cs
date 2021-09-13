namespace rMind.Core.Nodes
{
    /// <summary>
    /// Base node class.
    /// </summary>
    public abstract class Node : INode
    {
        /// <summary>
        /// Row type
        /// </summary>
        public string Type { get; protected set; }

        public object ToJson()
        {
            throw new NotImplementedException();
        }
    }
}
