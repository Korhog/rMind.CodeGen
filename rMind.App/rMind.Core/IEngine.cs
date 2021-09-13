
using rMind.Core.Nodes;

namespace rMind.Core
{
    /// <summary>
    /// rMind Node Engine. 
    /// </summary>
    public interface IEngine
    {
        INode CreateNode(Guid guid);
    }
}
