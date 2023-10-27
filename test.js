function FormsList() {
  const router = useRouter();
  const dispatch = useDispatch();
  const formList = useSelector(state => state.form.formList);
  const [filteredFormList, setFilteredFormList] = useState([]);

  useEffect(() => {
    dispatch(fetchFormData());
  }, []);

  useEffect(() => {
    setFilteredFormList(formList);
  }, [formList]);

  const onChange = event => {
    const searchWord = event.target.value;
    const filteredList = formList.filter(form =>
      form.header.toLowerCase().includes(searchWord.toLowerCase())
    );
    setFilteredFormList(searchWord === '' ? formList : filteredList);
  };

  const removeFormHandler = useCallback(
    (event, formId) => {
      if (window.confirm('삭제하시겠습니까?')) {
        dispatch(removeFormData(formId));
        router.push('/forms');
        event.stopPropagation();
      } else {
        event.stopPropagation();
      }
    },
    [dispatch, router]
  );

  return (
    <table>
      <tbody>
        {filteredFormList.map(data => (
          <tr key={data.id} onClick={() => showDetailHandler(data.id)}>
            <td>{data.header}</td>
            <td>{new Date(data.creationDate).toLocaleString()}</td>
            <td className="controls">
              <button onClick={event => removeFormHandler(event, data.id)}>
                삭제
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FormsList;
