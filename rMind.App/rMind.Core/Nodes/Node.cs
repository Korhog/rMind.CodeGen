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
        public virtual string Type => GetType().Name;

        public object ToJson()
        {
            throw new NotImplementedException();
        }
    }
}
