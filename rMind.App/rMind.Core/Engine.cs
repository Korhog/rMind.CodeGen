using rMind.Core.Nodes;
using rMind.Core.Nodes.Rows;

namespace rMind.Core
{
    /// <summary>
    /// rMind Node Engine implementation. 
    /// </summary>
    public class Engine : IEngine
    {
        public Engine()
        {

        }

        public INode CreateNode(Guid guid)
        {
            var result = new RowNode();
            result.Rows.Add(
                new Row
                {
                    InPin = new Nodes.Pins.Pin(),
                    OutPin = new Nodes.Pins.Pin
                    {
                        RowSpan = 2
                    }
                });

            result.Rows.Add(
                new Row
                {
                    InPin = new Nodes.Pins.Pin()
                });

            return result;
        }
    }
}
