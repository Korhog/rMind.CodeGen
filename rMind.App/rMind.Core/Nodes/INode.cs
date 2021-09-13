namespace rMind.Core.Nodes
{
    public interface INode: ISerializableNode
    {
        string Type { get; }
    }
}
