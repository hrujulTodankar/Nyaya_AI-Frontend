# 🚀 Quick Start Guide - Deploy Now!

## ⚡ 5-Minute Deployment

### Prerequisites
- ✅ Backend running at: https://nyaya-ai-0f02.onrender.com
- ✅ Vercel account
- ✅ Git repository connected to Vercel

---

## Step 1: Verify Backend (30 seconds)

```bash
curl https://nyaya-ai-0f02.onrender.com/health
```

**Expected Response:**
```json
{"status": "healthy", "service": "nyaya-api-gateway"}
```

✅ If you see this, backend is ready!

---

## Step 2: Deploy to Vercel (2 minutes)

### Option A: Using Vercel CLI
```bash
cd frontend
vercel --prod
```

### Option B: Using Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click "Import Project"
3. Select your GitHub repository
4. Click "Deploy"

---

## Step 3: Set Environment Variable (1 minute)

### In Vercel Dashboard:
1. Go to your project
2. Click "Settings"
3. Click "Environment Variables"
4. Add new variable:
   - **Name:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://nyaya-ai-0f02.onrender.com`
   - **Environment:** Production
5. Click "Save"

### Redeploy:
1. Go to "Deployments"
2. Click "..." on latest deployment
3. Click "Redeploy"

---

## Step 4: Test Your Deployment (1 minute)

1. Open your Vercel URL (e.g., `https://your-app.vercel.app`)
2. Click "EXPLORE" or navigate to legal query
3. Submit a test query: "What are contract laws in India?"
4. Wait for response (first request may take 30-60s)
5. Verify response appears in UI

---

## ✅ Success Checklist

After deployment, verify:

- [ ] Frontend loads without errors
- [ ] Can submit legal query
- [ ] Response appears in UI
- [ ] No CORS errors in console
- [ ] Network tab shows correct backend URL
- [ ] Trace ID is generated
- [ ] Loading states work

---

## 🐛 Troubleshooting

### Issue: "Failed to fetch"
**Solution:** Wait 30-60 seconds for Render backend to wake up (free tier)

### Issue: CORS Error
**Solution:** 
```bash
# Check backend CORS settings
# Backend should allow: origin: "*" or your Vercel domain
```

### Issue: Environment variable not working
**Solution:**
1. Verify variable name is exactly: `NEXT_PUBLIC_API_URL`
2. Redeploy after setting variable
3. Check Vercel logs for errors

### Issue: 404 Not Found
**Solution:** Verify endpoint paths:
- ✅ Correct: `/nyaya/query`
- ❌ Wrong: `/query` or `/api/query`

---

## 🔍 Quick Tests

### Test 1: Health Check
```bash
curl https://nyaya-ai-0f02.onrender.com/health
```

### Test 2: Legal Query
```bash
curl -X POST https://nyaya-ai-0f02.onrender.com/nyaya/query \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What are the penalties for breach of contract?",
    "jurisdiction_hint": "India",
    "user_context": {
      "role": "citizen",
      "confidence_required": true
    }
  }'
```

### Test 3: Browser Console
```javascript
// Run in browser console on your deployed site
fetch('https://nyaya-ai-0f02.onrender.com/health')
  .then(r => r.json())
  .then(d => console.log('✅ Backend connected:', d))
  .catch(e => console.error('❌ Backend error:', e))
```

---

## 📊 Monitoring

### Vercel Dashboard
- **URL:** https://vercel.com/dashboard
- **Check:** Deployment status, build logs, analytics

### Render Dashboard
- **URL:** https://dashboard.render.com
- **Check:** Backend logs, request counts, uptime

### Browser DevTools
- **Network Tab:** Verify API calls
- **Console:** Check for errors
- **Application Tab:** Verify environment variables

---

## 🎯 What to Expect

### First Request
- ⏱️ **Time:** 30-60 seconds
- 📝 **Reason:** Render free tier cold start
- ✅ **Normal:** This is expected behavior

### Subsequent Requests
- ⏱️ **Time:** 1-3 seconds
- 📝 **Reason:** Backend is warmed up
- ✅ **Normal:** Fast response times

---

## 📱 Test Scenarios

### Scenario 1: Basic Query
1. Go to "Ask Legal Question"
2. Enter: "What are the penalties for theft in India?"
3. Click "Get Legal Analysis"
4. Wait for response
5. ✅ Should see analysis with confidence score

### Scenario 2: Error Handling
1. Disconnect internet
2. Submit query
3. ✅ Should see error message
4. Reconnect internet
5. Retry query
6. ✅ Should work

### Scenario 3: Loading State
1. Submit query
2. ✅ Button should show "Analyzing..."
3. ✅ Button should be disabled
4. After response
5. ✅ Button returns to normal

---

## 🔗 Important URLs

### Your Deployment
- **Frontend:** [Your Vercel URL]
- **Backend:** https://nyaya-ai-0f02.onrender.com

### Dashboards
- **Vercel:** https://vercel.com/dashboard
- **Render:** https://dashboard.render.com

### Documentation
- **Integration Guide:** See INTEGRATION.md
- **Deployment Checklist:** See DEPLOYMENT_CHECKLIST.md
- **Architecture:** See ARCHITECTURE.md

---

## 🎉 You're Done!

If all tests pass, your integration is complete! 🎊

### Next Steps:
1. ✅ Share your Vercel URL
2. ✅ Monitor for 24 hours
3. ✅ Gather user feedback
4. ✅ Optimize based on usage

---

## 📞 Need Help?

### Check These First:
1. Backend health endpoint
2. Vercel environment variables
3. Browser console errors
4. Network tab in DevTools

### Still Stuck?
1. Check INTEGRATION.md for detailed docs
2. Review DEPLOYMENT_CHECKLIST.md
3. Test endpoints with Postman
4. Check backend logs on Render

---

## 🏆 Success!

```
┌─────────────────────────────────────────┐
│  ✅ Frontend Deployed                   │
│  ✅ Backend Connected                   │
│  ✅ Environment Variables Set           │
│  ✅ All Tests Passing                   │
│                                         │
│  🎉 INTEGRATION COMPLETE! 🎉           │
└─────────────────────────────────────────┘
```

**Your Nyaya AI platform is now live!** 🚀

---

**Deployment Time:** ~5 minutes  
**Status:** ✅ Ready to Deploy  
**Last Updated:** 2024
