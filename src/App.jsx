import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

export default function App() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    async function loadArticles() {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('id', { ascending: false })

      if (error) {
        console.error(error)
        return
      }

      setArticles(data || [])
    }

    loadArticles()
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>موقع الكونكورات</h1>

      {articles.map((article) => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
          <hr />
        </div>
      ))}
    </div>
  )
}